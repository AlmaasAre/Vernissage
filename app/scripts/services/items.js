'use strict';

app
  	.factory('Items', function Items($rootScope) {

    	var _playing = false;
    	var _next = 0;
    	var _queue = [];
        var _ready = [];

        // Randomize Array function
        function shuffle(o){ //v1.0
            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        };

    	var _getPlaying = function() {
    		return _playing;
    	}

    	var _setPlaying = function(val) {
            _queue = shuffle(_queue);
    		_playing = val;
    	}

        function inArray(item, array) {

            for(var i = 0; i < array.length; i++) {
                if(array[i] === item)
                {
                    return true;
                    break;
                }
            }

            return false;
        }

        var _queueItem = function(id) {
            console.log("QUEUE", id);

            if(!inArray(id, _queue))
            {
		          _queue.push(id);
            }

            // if(_queue.length === 20)
            // {
                // _queue = shuffle(_queue);
            // }

            console.log("Queue: "+_queue.length);
    	}

        var _readyItem = function(id) {
            if(!inArray(id, _ready))
            {
                _ready.push(id);
                console.log("READY", _ready.length, _queue.length);
            }

            if(_ready.length === _queue.length)
            {
                _nextItem();
            }
        }

        var _clearQueue = function() {
            console.log("Clear queue");
            _queue = [];
            _next = 0;
        }

        var reverse = false;

    	var _nextItem = function() {

            // console.log("NEXT",  _queue[_next]);
            // console.log(_next, _queue.length);
            if(_next !== 0 && _next !== _queue.length-1 && _next % 20 === 0)
            {
                // console.log("All items shown, shuffling array and restarting.");

                // _next = 0;

                // _queue = shuffle(_queue);
                // _playing = false;

                $rootScope.$broadcast('NextPage', _queue[_next]);
            }

            else if(_next === _queue.length-1)
            {
                // _queue = _queue.reverse();
                // reverse = !reverse;
                _next = 0;
                $rootScope.$broadcast('Restart', _queue[_next]);
            }

            else
            {
                $rootScope.$broadcast('Show', _queue[_next]);
            }

            _next++;
        }

    	return {
    		setPlaying: _setPlaying,
    		getPlaying: _getPlaying,
    		queueItem: _queueItem,
            clearQueue: _clearQueue,
    		nextItem: _nextItem,
            readyItem: _readyItem
    	}
  	});
