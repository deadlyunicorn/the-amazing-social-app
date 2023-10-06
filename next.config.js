/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental:{
    serverActions:true,
  },
  images:{
    domains:[
      'the-amazing-social-app.s3.eu-central-1.amazonaws.com',
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com']
  }
}

module.exports = nextConfig
