import axios from 'axios'

// const CLOUD_NAME = 'diskr186m'

export const uploadImage = formData => axios.post('https://api.cloudinary.com/v1_1/diskr186m/auto/upload', formData)
// export const uploadImage = files => axios.post('/upload', files)
// export const removeImage = publicID => axios.post('/user', publicID)
