import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Function to ensure flor-del-bonche GLB has 7 distinct materials for each petal, pistil, and base
function splitFlorMaterials(inPath: string, outPath: string) {
  try {
    if (!fs.existsSync(inPath)) return;
    const buf = fs.readFileSync(inPath);
    const jsonChunkLength = buf.readUInt32LE(12);
    const jsonBuf = buf.slice(20, 20 + jsonChunkLength);
    const binBuf = buf.slice(20 + jsonChunkLength);
    const gltf = JSON.parse(jsonBuf.toString('utf8'));

    const partNames = [
      'Base y Cáliz',
      'Pétalo Superior',
      'Pétalo Izquierdo',
      'Pétalo Inferior',
      'Pétalo Derecho',
      'Pétalo Frontal',
      'Pistilo y Polen',
    ];

    const baseMat = gltf.materials[0];
    const pistilMat = gltf.materials[1] || baseMat;

    const newMaterials = partNames.map((name, idx) => {
      const source = idx === 6 ? pistilMat : baseMat;
      return {
        ...JSON.parse(JSON.stringify(source)),
        name: name,
        pbrMetallicRoughness: {
          baseColorFactor: [0.94, 0.98, 1.0, 1.0],
          metallicFactor: 0.05,
          roughnessFactor: 0.75,
        },
      };
    });

    gltf.materials = newMaterials;

    gltf.meshes.forEach((mesh: any, idx: number) => {
      mesh.name = partNames[idx];
      mesh.primitives.forEach((prim: any) => {
        prim.material = idx;
      });
    });

    gltf.nodes.forEach((node: any, idx: number) => {
      node.name = partNames[idx];
    });

    const newJsonStr = JSON.stringify(gltf);
    const padding = (4 - (newJsonStr.length % 4)) % 4;
    const paddedJsonStr = newJsonStr + ' '.repeat(padding);
    const newJsonBuf = Buffer.from(paddedJsonStr, 'utf8');

    const newHeader = Buffer.alloc(12);
    newHeader.writeUInt32LE(0x46546C67, 0);
    newHeader.writeUInt32LE(2, 4);
    newHeader.writeUInt32LE(12 + 8 + newJsonBuf.length + binBuf.length, 8);

    const newJsonHeader = Buffer.alloc(8);
    newJsonHeader.writeUInt32LE(newJsonBuf.length, 0);
    newJsonHeader.writeUInt32LE(0x4E4F534A, 4);

    const outBuf = Buffer.concat([newHeader, newJsonHeader, newJsonBuf, binBuf]);
    fs.writeFileSync(outPath, outBuf);
  } catch (e) {
    // Ignore errors
  }
}

// Sync files placed in root to public directory automatically
function syncRootAssetsPlugin() {
  const fileMappings: Record<string, string[]> = {
    'modelo iguana pagina.glb': ['iguana-3d.glb', 'modelo iguana pagina.glb'],
    'IguanaLateral.jpg': ['iguana-lateral.jpg', 'IguanaLateral.jpg'],
    'IguanaFrontal.jpg': ['iguana-frontal.jpg', 'IguanaFrontal.jpg'],
    'IguanaSuperior.jpg': ['iguana-superior.jpg', 'IguanaSuperior.jpg'],
    'FlorDelBoncheFrontal.jpg': ['flor-del-bonche-frontal.jpg', 'FlorDelBoncheFrontal.jpg'],
    'FlorDelBoncheSuperior.jpg': ['flor-del-bonche-superior.jpg', 'FlorDelBoncheSuperior.jpg'],
    'IguanaHero.jpg': ['iguana-hero.jpg', 'IguanaHero.jpg'],
    'florHero.jpg': ['flor-hero.jpg', 'florHero.jpg'],
  };

  const copyIfNewer = (srcPath: string, destPath: string) => {
    try {
      if (!fs.existsSync(srcPath)) return;
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(srcPath, destPath);
        return;
      }
      const srcStat = fs.statSync(srcPath);
      const destStat = fs.statSync(destPath);
      if (srcStat.mtimeMs > destStat.mtimeMs || srcStat.size !== destStat.size) {
        fs.copyFileSync(srcPath, destPath);
      }
    } catch (e) {
      // Ignore copy errors
    }
  };

  const syncAll = (rootDir: string) => {
    const publicDir = path.resolve(rootDir, 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Split flor materials into public GLB
    const florRoot = path.resolve(rootDir, 'modelo flor pagina.glb');
    const florPublic = path.resolve(publicDir, 'flor-del-bonche-3d.glb');
    if (fs.existsSync(florRoot)) {
      splitFlorMaterials(florRoot, florPublic);
    }

    for (const [srcName, destNames] of Object.entries(fileMappings)) {
      const srcFile = path.resolve(rootDir, srcName);
      for (const destName of destNames) {
        copyIfNewer(srcFile, path.resolve(publicDir, destName));
      }
    }
  };

  return {
    name: 'sync-root-assets',
    buildStart() {
      syncAll(process.cwd());
    },
    configureServer(server) {
      syncAll(server.config.root);
      server.watcher.on('change', (file) => {
        const basename = path.basename(file);
        if (basename === 'modelo flor pagina.glb') {
          syncAll(server.config.root);
        } else if (fileMappings[basename]) {
          syncAll(server.config.root);
        }
      });
      server.watcher.on('add', (file) => {
        const basename = path.basename(file);
        if (basename === 'modelo flor pagina.glb') {
          syncAll(server.config.root);
        } else if (fileMappings[basename]) {
          syncAll(server.config.root);
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), syncRootAssetsPlugin()],
  server: {
    port: 3000,
    open: true,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  },
})
