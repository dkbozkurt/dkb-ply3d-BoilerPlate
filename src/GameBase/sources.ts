import grassColorTexture from '@/textures/flower.png'
// import grassNormalTexture from '@/textures/dirt/normal.jpg'

type Source = {
    name: string;
    type: 'texture' | 'gltfModel' | 'material' | 'cubeTexture' | 'audio'; // Enumerate possible types
    path: string; // Replace `string` with the actual type if `path` is not a string
};

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