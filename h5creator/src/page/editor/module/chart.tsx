/* eslint-disable react-hooks/exhaustive-deps */
import './chart.scss'
import * as echarts from 'echarts'
import { useEffect, useRef } from 'react';
import {pie,bar} from './common/chartsDemo'
import ModuleUtil from '../../../lib/ModuleUtil';
import { useDispatch } from 'react-redux';
interface type{
    type:string
}
function Chart(props:type){
    let chartDom =  useRef<HTMLDivElement>(null)
     const dispatch = useDispatch()
    useEffect(() => {
        
        var myChart = echarts.init(chartDom.current as HTMLDivElement);
        let option:any = pie;
        switch(props.type){
            case 'pie':
                option = pie;
                break
            case 'bar':
                option = bar;
                break
        }
        
        myChart.setOption(option);
        return () => {
            
        };
    },[]);
    const selectChart = async () => {
        let chartInfo = await ModuleUtil.getChartInfo(props.type);
        dispatch({type:"addChart", chart:chartInfo});
      };
    return(
        <div className='chart' onClick={()=>{selectChart()}}>
            <div className='mask'></div>
            <div className='chart-content'> 
                <div ref={chartDom} style={{width: `280px`,height:`280px`}}>

                </div>
            </div>
        </div>
    )
}
Chart.defaultProps = {
    type: 'pie'
  };

export default Chart