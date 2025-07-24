import { Event } from '@react-three/fiber';

export interface ThreeEvent extends Event {
  stopPropagation(): void;
  point: {
    x: number;
    y: number;
    z: number;
  };
}