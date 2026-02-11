const App = require('./App.js')
const PORT = process.env.PORT || 5000;

App.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

