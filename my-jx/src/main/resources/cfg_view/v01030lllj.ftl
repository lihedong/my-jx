<#ftl attributes={"sql":"s01030_flowAdd"}>
return {
     "type": "pie",
    "dataProvider": [{
                        "netType": "2G",
                        "value": <#list s01030_flowAdd as item>'${item.gsm_addflow_num}'</#list>
                    }, {
                        "netType": "3G",
                        "value": <#list s01030_flowAdd as item>'${item.td_addflow_num}'</#list>
                    }, {
                        "netType": "4G",
                        "value": <#list s01030_flowAdd as item>'${item.lte_addflow_num}'</#list>
                    }],
    "valueField": "value",
    "titleField": "netType",
    "colors": ['#3594CA', '#59BF78','#B37BD0'],
    "legend": {
        "align": "center",
        "position":"absolute",
        "top": 20,
        "color":"#ffffff",
        "markerSize":26,
        "fontSize" : 26,
        "markerType": "circle",
        "valueWidth": 0,
        "autoMargins": true
    },
    "balloon": {
        "adjustBorderColor": false,
        "borderAlpha": 0,
        "fillAlpha": 1,
        "color": "#FFFF00"
    },
    "startDuration": 2,
    "labelRadius": 15,
    "innerRadius": "50%",
    "depth3D": 20,
    "outlineAlpha": 0.4,
    "balloonText": "<span style='font-size:26px;line-height:38px;'>[[percents]]%</span>",
    "angle": 50,
    "labelsEnabled": true,
    "labelTickColor":"#FFFFFF",
    "labelTickAlpha":1,
    "labelRadius":-10,
    "color":"#FFFF00",
    "fontSize":25,
    "labelText":" [[percents]]%",
    "export": {
        "enabled": true
    }
};