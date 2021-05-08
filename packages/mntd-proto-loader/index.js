'use strict'

const path = require('path')
const protoLoader = require('@grpc/proto-loader')
const grpc = require('@grpc/grpc-js')

const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, 'schema', 'Services.proto'),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    arrays: true
  }
)

const packageObj = grpc.loadPackageDefinition(packageDefinition)
const { GameService } = packageObj

module.exports = {
  GameService,
  grpc
}
