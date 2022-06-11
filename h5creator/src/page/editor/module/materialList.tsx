import material from   './materialList.module.scss'
import { Divider } from 'antd';
import Chart from './chart'
import Shape from './Shape'
function MaterialList(){
    return(
        <div>
            <Divider>表格</Divider>
            <div className={material.item}>
                <Chart type='pie'></Chart>
                <Chart type='bar'></Chart>
            </div>
            <Divider>图形</Divider>
            <div className={material.item}>
            <Shape type='polygon'></Shape>
            <Shape type='star'></Shape>
            <Shape type='sector'></Shape>
            <Shape type='flower'></Shape>
            <Shape type='circle'></Shape>
            </div>
        </div>
    )
}

export default MaterialList