namespace models {

    type Source = {
        name: string;
        type: 'texture' | 'gltfModel' | 'material' | 'cubeTexture' | 'audio'; // Enumerate possible types
        path: string; // Replace `string` with the actual type if `path` is not a string
    }

    // export type AudioResources = {
    //     [key: string]: HTMLAudioElement;
    // };
    type AudioResources = Record<string, HTMLAudioElement>;

    type Overlay = {
        geometry?: THREE.PlaneGeometry;
        material?: THREE.ShaderMaterial;
        mesh?: THREE.Mesh;
    }
}