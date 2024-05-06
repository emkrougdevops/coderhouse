export { connect } from 'mongoose'

exports.connectDB = () => {
    connect('mongodb://127.0.0.1:27017/comision53145')
    console.log('DB conected')
}
