export const fileUpload = async (file) => {
  if (!file) {
    return null;
  }

  const URL = 'https://api.cloudinary.com/v1_1/dnihaisdg/image/upload';

  const formData = new FormData();
  formData.append('upload_preset', 'recipes-app');
  formData.append('file', file);

  try {
    const resp = await fetch(URL, {
      method: 'POST',
      body: formData
    });

    if (!resp.ok) {
      throw new Error('Error uploading the file');
    }

    const cloudResp = await resp.json();
    return cloudResp.secure_url;
  } catch (error) {
    return null;
  }
}
