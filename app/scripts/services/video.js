'use strict';

app
  	.factory('Video', function Video($rootScope) {

    	var _playing = false;
    	var _next = 0;
    	var _queue = [];

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

    		$rootScope.$broadcast(_queue[_next]);
    	}

    	return {
    		setPlaying: _setPlaying,
    		getPlaying: _getPlaying,
    		queueVideo: _queueVideo,
    		finished: _finished
    	}
  	});
