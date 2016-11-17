'use strict';


angular.module('appTmp.dashboard', ['ngRoute'])


.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'views/dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  });
}])


.controller('DashboardCtrl', [function() {
    
    // For Pie Charts
    $('.pie-progress').asPieProgress({
        namespace: 'pie-progress'
    });
    $('.pie-progress').asPieProgress('start');
    
    
    // Line Graph
    var options = {
            showArea:!0,
            low:0,
            high:1e3,
            height:459,
            fullWidth:!0,
            axisX: {
                offset: 30
            }
            ,
            axisY: {
                offset:30,
                scaleMinSpace:80,
                labelInterpolationFnc:function(value) {
                    return 0==value?null: value
                }
                ,
                scaleMinSpace:50
            }
            ,
            chartPadding: {
                bottom: 12, left: 10
            },
            plugins:[Chartist.plugins.tooltip()]
    },
        
    labelList = ["Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
        "Jan",
        "Feb"],
        series1List= {
            name: "series-1", data: [0, 180, 600, 980, 850, 600, 300, 350, 600, 200, 630]
        }
        ,
        series2List= {
            name: "series-2", data: [0, 100, 520, 810, 620, 500, 630, 400, 380, 405, 210]
        }
        ,
        newScoreLineChart=function(chartId, labelList, series1List, series2List, options) {
            var lineChart=new Chartist.Line(chartId, {
                labels: labelList, series: [series1List, series2List]
            }
            , options);
            lineChart.on("draw", function(data) {
                var elem, parent;
                "point"===data.type&&(elem=data.element, parent=new Chartist.Svg(elem._node.parentNode), parent.elem("line", {
                    x1: data.x, y1: data.y, x2: data.x+.01, y2: data.y, "class": "ct-point-content"
                }
                ))
            }
            )
        }

    // Create a new line chart object where as first parameter we pass in a selector
    // that is resolving to our chart container element. The Second parameter
    // is the actual data object.
    newScoreLineChart('.ct-chart', labelList, series1List, series2List, options);
    
    

}]);


appTmp.directive("pieChart", function() {
    return {
        restrict: 'E',
        template : '<div class="pie-progress pie-progress-sm" data-plugin="pieProgress" data-valuemax="100" data-barcolor="#57c7d4" data-size="100" data-barsize="10" data-goal="86" aria-valuenow="86" role="progressbar"><span class="pie-progress-number blue-grey-700 font-size-20">86%</span></div>'
    };
});
