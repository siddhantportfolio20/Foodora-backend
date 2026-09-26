import ImageKit, { toFile } from "@imagekit/nodejs";

const imagekit = new ImageKit({
    privateKey: process.env.IMAGE_PRIVATE_KEY
});

async function uploadFile(file, fileName) {

    console.log("4. Calling ImageKit...");

    const result = await imagekit.files.upload({
        file: await toFile(file, fileName),
        fileName: fileName
    });

    console.log("5. ImageKit finished");

    console.log("ImageKit result:", result);

    return result;
}

export { uploadFile };
export default imagekit;