'use strict';

angular.module('appTmp.version', [
  'appTmp.version.interpolate-filter',
  'appTmp.version.version-directive'
])

.value('version', '0.1');
