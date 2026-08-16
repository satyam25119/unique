import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const items = [
  { id: 1, prompt: "Industrial EOT overhead crane being erected and installed in a large factory warehouse, orange safety markings, professional engineering work, dramatic lighting, high quality industrial photography, dark atmosphere" },
  { id: 2, prompt: "Close-up of heavy industrial helical gearbox being repaired and reassembled by engineers, metallic components, precision tools, workshop environment, professional photography, detailed" },
  { id: 3, prompt: "Modern VFD variable frequency drive electrical control panel with LED indicators, industrial automation, clean installation in warehouse, blue and orange indicator lights, professional photography" },
  { id: 4, prompt: "Large outdoor gantry crane being assembled at industrial construction site, steel beams, orange safety barriers, engineers at work, wide angle shot, professional industrial photography" },
  { id: 5, prompt: "Engineer performing preventive maintenance on overhead crane in factory, safety harness, tools, industrial environment, focus on hands working, professional photography" },
  { id: 6, prompt: "Crane safety limit switches and overload protection devices being installed on industrial crane, close-up of safety components, orange wiring, professional detailed photography" },
  { id: 7, prompt: "Tower crane being dismantled and removed from construction site, tall crane against skyline, professional engineering operation, dramatic perspective photography" },
  { id: 8, prompt: "Industrial steel wire rope spooled on crane drum, close-up of thick wire rope strands, metallic texture, heavy duty industrial component, professional macro photography" },
  { id: 9, prompt: "PLC programmable logic controller panel for multi-crane automation system, screens showing control interfaces, modern industrial control room, blue ambient lighting" },
  { id: 10, prompt: "Two yellow overhead cranes being relocated and moved on industrial rail tracks inside large manufacturing facility, wide angle industrial photography" },
  { id: 11, prompt: "Crane load testing with weighted blocks and certification process, engineer checking load gauge, industrial safety testing, professional documentary photography" },
  { id: 12, prompt: "Safety audit inspection of multiple industrial cranes in factory, checklist tablet, engineer inspecting crane components, compliance verification, professional photography" },
];

async function main() {
  const zai = await ZAI.create();
  const outDir = '/home/z/my-project/public/gallery';
  fs.mkdirSync(outDir, { recursive: true });

  for (const item of items) {
    console.log(`Generating image ${item.id}...`);
    try {
      const response = await zai.images.generations.create({
        prompt: item.prompt,
        size: '1152x864',
      });
      const buffer = Buffer.from(response.data[0].base64, 'base64');
      fs.writeFileSync(path.join(outDir, `gallery-${item.id}.webp`), buffer);
      console.log(`✓ Image ${item.id} saved (${(buffer.length / 1024).toFixed(0)}KB)`);
    } catch (err) {
      console.error(`✗ Image ${item.id} failed:`, err.message);
    }
  }
  console.log('Done!');
}

main().catch(console.error);
