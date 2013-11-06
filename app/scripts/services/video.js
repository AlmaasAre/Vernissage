'use strict';

app
  	.factory('Video', function Video($rootScope) {

    	var _playing = false;
    	var _next = 0;
        var _prev = 0;
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
    		_playing = val;
    	}

    	var _queueVideo = function(id) {
    		_queue.push(id);
    	}

    	var _finished = function() {
    		_next++;
            // console.log("NEXT",  _queue[_next]);

            if(_next === _queue.length)
            {
                _next = 0;

                _queue = shuffle(_queue);
            }

            //If the next video is the same as the last, skip it
            if(_queue[_next] === _prev)
            {
                _next++;
            }

            $rootScope.$broadcast('Video', _queue[_next]);
            _prev = _queue[_next];
    	}

    	return {
    		setPlaying: _setPlaying,
    		getPlaying: _getPlaying,
    		queueVideo: _queueVideo,
    		finished: _finished
    	}
  	});
