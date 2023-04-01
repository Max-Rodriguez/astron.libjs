/*
    astron.libts
    Copyright (c) 2023, Max Rodriguez. All rights reserved.

    All use of this software is subject to the terms of the revised BSD
    license. You should have received a copy of this license along
    with this source code in a file named "LICENSE."
*/

import {MODULE_DEBUG_FLAGS, MD_PORT} from './globals'
import { Datagram } from './Datagram'
import * as buffer from 'node:buffer'
import * as net from 'node:net'

export class Connection {
    private _DEBUG_: boolean = MODULE_DEBUG_FLAGS.CONNECTION
    private connected: boolean = false
    private socket: net.Socket

    constructor(host: string = "127.0.0.1", port: number = MD_PORT) {
        this.socket = new net.Socket()
        this.socket.on('connect', this.on_connect)
        this.socket.on('data', this.read_data)
        this.socket.connect({port: port, host: host})
    }

    private notify(msg: string) {
        if (!this._DEBUG_) return
        console.log(`${this.constructor.name}: ${msg}`)
    }

    private on_connect() {
        this.notify("TCP socket connected!")
    }

    private read_data(data: buffer.Buffer) {
        // TODO: handle reading data, use Datagram
    }

    public disconnect() {
        this.socket.destroy()
        this.connected = false
        this.notify("TCP socket closed!")
    }
    public is_connected(): boolean {
        return this.connected
    }
}