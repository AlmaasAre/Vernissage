'use strict';

app
  	.factory('Items', function Items($rootScope) {

    	var _playing = false;
    	var _next = 0;
    	var _queue = [];

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

    	var _queueItem = function(id) {
            // console.log("QUEUE", id);
    		_queue.push(id);
    	}

    	var _nextItem = function() {
    		_next++;
            // console.log("NEXT",  _queue[_next]);

            if(_next === _queue.length)
            {
                console.log("All items shown, shuffling array and restarting.");
                _next = 0;

                _queue = shuffle(_queue);
            }

            console.log("QUEUE", _queue, _next);
            $rootScope.$broadcast('Show', _queue[_next]);
    	}

    	return {
    		setPlaying: _setPlaying,
    		getPlaying: _getPlaying,
    		queueItem: _queueItem,
    		nextItem: _nextItem
    	}
  	});
