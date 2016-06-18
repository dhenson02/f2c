'use strict';

import io from 'socket.io-client/socket.io';
import Event from 'event';
import Immutable from 'immutable';
import installDevTools from 'immutable-devtools';

installDevTools(Immutable);

export const socket = io();

export class Store extends Event {
    constructor () {
        super();
        this.data = Immutable.Map();
    }

    grabData ( type, params ) {
        socket.emit(type, params);
    }

    getState ( id ) {
        return id ?
               this.data.get(id) :
               this.data;
    }

    setData ( id, changes ) {
        const createMap = function ( data, oldData ) {
            let processed = oldData || Immutable.Map();
            if ( Array.isArray(data) ) {
                data.forEach(item => {
                    processed = processed.set(item.id || item.week, Immutable.Map(item))
                });
            }
            else {
                processed = oldData && oldData.merge(data) || Immutable.Map(data);
            }
            return processed;
        };

        var data = this.data;
        var current = typeof id === 'string' ?
                      data.get(id) :
                      data;
        if ( id !== null && changes !== null ) {
            if ( !current || current.size === 0 ) {
                this.data = typeof id === 'string' ?
                            data.set(id, changes) :
                            createMap(id);
            }
            else {
                if ( typeof id === 'string' ) {
                    this.data = data.update(id, function ( obj ) {
                        return Object.assign({}, obj, changes);
                    });
                }
                else if ( typeof changes === 'function' ) {
                    this.data = data.update(id, changes);
                }
                else {
                    // We now know id has to be the expected `changes` object
                    this.data = createMap(id, current);
                }
            }
        }
        else {
            this.data = typeof id === 'string' || !current ?
                        data.delete(id) :
                        Immutable.Map();
        }
        return this.fire('change', this);
    }
}
