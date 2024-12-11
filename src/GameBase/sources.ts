import grassColorTexture from '@/textures/flower.png'
// import grassNormalTexture from '@/textures/dirt/normal.jpg'
import { Source } from './Types';

const sources: Source[] = [
    {
        name: 'grassColorTexture',
        type: 'texture',
        path: grassColorTexture
    },
    // {
    //     name: 'foxModel',
    //     type: 'gltfModel',
    //     path: fox
    // },
    // {
    //     name: 'matcapMaterial1',
    //     type: 'texture',
    //     path: matcapMaterial1
    // },
]

export default sources;