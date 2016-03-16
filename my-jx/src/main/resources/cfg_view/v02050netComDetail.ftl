<#ftl attributes={"sql":"s02050_netCompDetail"}>
return {
      "type": "serial",
      "dataProvider":[<#list s02050_netCompDetail as item>{"name":"${item.sort_time}","open":${item.openValue},"close":${item.closeValue},"color":"${item.color}","balloonValue":${item.changeValue}}<#if item_has_next>,</#if></#list>], 
      "valueAxes": [{
           "gridColor":"#61CFFF",
           "axisAlpha": 1,
           "gridAlpha": 0,
           "dashLength": 3,
           "color": "#61CFFF",
           "axisThickness":3,
           "axisColor":"#61CEFC"
      }],
      "balloon": {
            "adjustBorderColor": true,
            "borderColor": "#84A5D0",
            "fillColor":"#02234E"
       },
      "fontSize":18,
      "fontFamily":"microsoft yahei",
      "startDuration": 1,
      "graphs": [ {
            "balloonText": "<span style='color:#ffffff'>[[category]]时<br>起始:<b>[[open]]</b><br>终止:<b>[[close]]</b><br>振幅:<b>[[balloonValue]]</b></span>",
            "colorField": "color",
            "fillAlphas": 0.8,
            "labelText": "[[balloonValue]]",
            "lineColor": "#03479D",
            "color":"#ffffff",
            "openField": "open",
            "type": "column",
            "valueField": "close"
      }],
      "columnWidth": 0.8,
      "categoryField": "name",
      "categoryAxis": {
            "gridPosition": "start",
            "color": "#61CEFC",
            "autoGridCount":true,
            "axisThickness":3,
            "axisColor":"#61CEFC",
            "axisAlpha": 1,
            "gridAlpha": 0,
            "tickLength": 0
      }
};