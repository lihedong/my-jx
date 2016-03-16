<#ftl attributes={"sql":"s02020_tollTrafChart"}>
return {
            "type": "serial",
            "addClassNames": true,
            "autoMargins": true,
            "marginRight": 8,
            "marginTop": 10,
            "balloon": {
                "adjustBorderColor": false,
                "horizontalPadding": 10,
                "verticalPadding": 8,
                "color": "#ffffff"
            },
            "startDuration": 2,
            "dataProvider": [<#list s02020_tollTrafChart as item>{"time":"${item.sort_time}","value":${item.toll_traf_num}}<#if item_has_next>,</#if></#list>],
            "graphs": [{
                "balloonText": "[[category]]: <b>[[value]]</b>",
                "fillColors": "#5498FF",
                "fillColorsField": "#5498FF",
                "fillAlphas": 1,
                "lineAlpha": 0.1,
                "gapPeriod":0.8,
                "type": "column",
                "valueField": "value"
            }],
            "depth3D": 20,
            "angle": 30,
            "fontSize": 20,
            "fontFamily": "microsoft yahei",
            "chartCursor": {
                "categoryBalloonEnabled": false,
                "cursorAlpha": 0,
                "zoomable": false
            },
            "categoryField": "time",
            "categoryAxis": {
                "gridPosition": "start",
                "color": "#61CFFF",
                "autoGridCount":false,
                "gridCount":7,
                "axisAlpha": 0,
                "gridAlpha": 0,
                "tickLength": 0
            },
            "valueAxes": [{
                "gridColor":"#61CFFF",
                "axisAlpha": 0,
                "gridAlpha": 1,
                "dashLength": 0,
                "color": "#61CFFF"
            }]
        };