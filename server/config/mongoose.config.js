const { connect } = require('mongoose');

connect('mongodb://localhost/school_admin_dojo_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('We are making some connections with the database!!!'))
    .catch(() => console.log('Ohhhh, something went wrong!'));