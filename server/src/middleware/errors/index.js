

export default (app) => {
  app.use((err, req, res, next) => {
    console.log('An error occured');
    console.log(err)
    next();
  })
}