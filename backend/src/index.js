const app = require('./app');
const port = process.env.PORT || 3001;

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () =>
    console.log('Backend running on http://localhost:' + port)
  );
}
