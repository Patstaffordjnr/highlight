import { Pipe, PipeTransform } from '@angular/core';

const PLACEHOLDER_IMAGES = [
  '/assets/testJPGS/11457e1544a70e9dd36e2c5fc9432368.jpg',
  '/assets/testJPGS/12512f19ccd094c612cd8be2a2c1f3d9.jpg',
  '/assets/testJPGS/1672da958a273d83f9fed97cf7edb09f.jpg',
  '/assets/testJPGS/4de7eaeaad54f391bf3d28fa382c1724.jpg',
  '/assets/testJPGS/551bf1e8b37f9504bddaa1f27a81e9c4.jpg',
  '/assets/testJPGS/5a0c5f4f1a29d4b226c629b55f7751e5.jpg',
  '/assets/testJPGS/671144651_1303399978560111_5669794616806965318_n.jpg',
  '/assets/testJPGS/67572954b62f00949b3f5176b20deb59.jpg',
  '/assets/testJPGS/81f836bc2fdf607d91a29fb2d3aeeefb.jpg',
  '/assets/testJPGS/a631316a9c4f9e6b1c703b564691ee2a.jpg',
  '/assets/testJPGS/d2b760a64c5ad0dec86ce24b6cfb8e26.jpg',
  '/assets/testJPGS/df68a577c28757d6ee551afb41f51cec.jpg',
  '/assets/testJPGS/ea921c4ffc93ff81581b563f5a777e92.jpg',
  '/assets/testJPGS/f2244a2b68bd43cea1d43b1116b8234e.jpg',
  '/assets/testJPGS/f62c0d96885d72dec1a808f14fcb0325.jpg',
];

@Pipe({ name: 'buskerPlaceholder', standalone: true })
export class BuskerPlaceholderPipe implements PipeTransform {
  transform(id: string | null | undefined): string {
    if (!id) return PLACEHOLDER_IMAGES[0];
    const hash = Array.from(String(id)).reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return PLACEHOLDER_IMAGES[hash % PLACEHOLDER_IMAGES.length];
  }
}
