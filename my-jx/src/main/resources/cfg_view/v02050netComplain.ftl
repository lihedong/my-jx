<#ftl attributes={"sql":"s02050_networkComplain"}>
return {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color:['#76D8FF','#0099FF','#FFFFCC','#E26713','#BFD300','#339900','#9A00CC','#424C1B'],
        legend: {
            orient: 'vertical',
            itemGap:25,
            left: 540,
            itemWidth:30,
            itemHeight:20,
            top:'center',
            formatter: '{name}',
            textStyle: {
                color:'#fff',
                fontFamily:'Microsoft Yahei',
                fontSize:18
            },
            data: [<#list s02050_networkComplain as item>'${item.ne_type}'<#if item_has_next>,</#if></#list>] 
        },
        series : [
            {
                name: '类别',
                type: 'pie',
                radius: ['30%', '70%'],
                center: ['35%', '50%'],
                label: {
                  normal:{
                      show:true,
                      formatter:'{d}%',
                      textStyle:{
                          color: "#fff",
                          fontSize:16
                      }
                  }
                },
                data:[<#list s02050_networkComplain as item>{"name":"${item.ne_type}","value":${item.complain_num}}<#if item_has_next>,</#if></#list>],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };