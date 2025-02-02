import '../styles/ThreeDimShape.css';
import React, { useState, useEffect, useRef } from 'react';


let initialAngle = 0.035; //angle of the shape
const shapeScaleFactor = 29;
const windowScaleFactor = 120;
const zStart = 0.45;
const yStart = 1;

//going to be using arbitrary numbers then scaling/tweaking later
const startPositions = [
    [0, 0, -zStart], //top left
    [1, 0, -zStart], //top right
    [0, yStart, -zStart], //bottom left
    [1, yStart, -zStart], //bottom right
    [0, 0, zStart],
    [1, 0, zStart], 
    [0, yStart, zStart],
    [1, yStart, zStart]
];
startPositions.forEach(pos => {
    pos.forEach((val, index) => {
        pos[index] = val * shapeScaleFactor; 
    });
});
//console.log(startPositions);
//projection matrix turns a 3D object (x,y,z) into a 2D object (x, y)
//represents the shadow project of the object
const projectionMatrix = [
    [1, 0, 0],
    [0, 1, 0],
];
function rotationXY(angle)
{
    return [[Math.cos(angle), -Math.sin(angle), 0],
            [Math.sin(angle), Math.cos(angle), 0],
            [0, 0, 1]];
}
function rotationXZ(angle)
{
    return [[Math.cos(angle), 0, -Math.sin(angle)],
            [0, 1, 0],
            [Math.sin(angle), 0, Math.cos(angle)]];
}
function rotationYZ(angle)
{
    return [[1, 0, 0],
            [0, Math.cos(angle), -Math.sin(angle)],
            [0, Math.sin(angle), Math.cos(angle)]];
}

function ThreeDimShape()
{
    let [positions, setPositions] = useState(startPositions);
    const angle = useRef(initialAngle);

    //timer to animate the shape
    useEffect(() => {
        const interval = setInterval(() => {
            //angle.current += 0.0002;
            //console.log(toDegrees(angle.current));
            if(toDegrees(angle.current) >= 2)
                //angle.current = 0;

            //try getting rid of centerXYZ and computing the shape to potentially fix Z Rotation
            setPositions((prevPositions) => {
                //calculate the center
                const centerX = startPositions.reduce((sum, [x]) => sum + x, 0) / startPositions.length;
                const centerY = startPositions.reduce((sum, [, y]) => sum + y, 0) / startPositions.length;
                const centerZ = startPositions.reduce((sum, [, , z]) => sum + z, 0) / startPositions.length;
            
                return prevPositions.map(([x, y, z]) => {
                    //translate to origin 
                    const translated = [x - centerX, y - centerY, z - centerZ];
                    //rotate
                    let rotated = multiplyMatrix(rotationXY(angle.current), translated);
                    rotated = multiplyMatrix(rotationYZ(angle.current), rotated);
                    rotated = multiplyMatrix(rotationXZ(angle.current), rotated);
                    //translate back to the original center
                    //console.log([rotated[0][0] + centerX, rotated[1][0] + centerY, rotated[2][0] + centerZ]);
                    return [rotated[0][0] + centerX, rotated[1][0] + centerY, rotated[2][0] + centerZ];
                });
            });
        }, 35);

        return () => {
            //console.log("Cleared interval");
            clearInterval(interval);
        };
    }, [angle]);
    //console.log(positions[4] + positions[5]); //4 - 20, 20, 30   5 - 30, 20, 30
    return(
        <div id="shape-container">
            <div id="center-sec" style={handleCenterPosition(positions)}>
                <div id="shape">Apo</div>
            </div>
            <div className="point" id="point1" style={handlePosition(0, positions)}></div>
            <div className="point" id="point2" style={handlePosition(1, positions)}></div>
            <div className="point" id="point3" style={handlePosition(2, positions)}></div>
            <div className="point" id="point4" style={handlePosition(3, positions)}></div>
            <div className="point" id="point5" style={handlePosition(4, positions)}></div>
            <div className="point" id="point6" style={handlePosition(5, positions)}></div>
            <div className="point" id="point7" style={handlePosition(6, positions)}></div>
            <div className="point" id="point8" style={handlePosition(7, positions)}></div>
            <div className="line" style={handleLine(0, 1, positions, angle.current)}></div>
            <div className="line" style={handleLine(2, 3, positions, angle.current)}></div>
            <div className="line" style={handleLine(6, 7, positions, angle.current)}></div>
            <div className="line" style={handleLine(4, 5, positions, angle.current)}></div>

            <div className="line" style={handleLine(0, 2, positions, angle.current)}></div>
            <div className="line" style={handleLine(1, 3, positions, angle.current)}></div>

            <div className="line" style={handleLine(7, 5, positions, angle.current)}></div>
            <div className="line" style={handleLine(6, 4, positions, angle.current)}></div>

            <div className="line" style={handleLine(0, 4, positions, angle.current)}></div>
            <div className="line" style={handleLine(2, 6, positions, angle.current)}></div>
            <div className="line" style={handleLine(1, 5, positions, angle.current)}></div>
            <div className="line" style={handleLine(3, 7, positions, angle.current)}></div>
            
            
        </div>
    );
}

function handlePosition(index, positions)
{
    let windowWidth = window.innerWidth / windowScaleFactor;
    let windowHeight = window.innerHeight / windowScaleFactor;
    let positionX = positions[index][0] * windowWidth;
    let positionY = positions[index][1] * windowHeight;

    //responsive offset
    const offsetX = window.innerWidth * 0.37;
    const offsetY = window.innerHeight * 0.29;

    positionX += offsetX;
    positionY += offsetY;

    //change point based on z position (front points in front, back points in back)
    let zindex = 2;
    if(positions[index][2] > 0)
    {
        //go behind
        zindex = 0;
    }

    return {top: `${positionY}px`, left: `${positionX}px`, zIndex: zindex};
}
function handleCenterPosition(positions)
{
    return {top: `${33}%`, left: `${45}%`};
}
function handleLine(index1, index2, positions, angle)
{
    let windowWidth = window.innerWidth / windowScaleFactor;
    let windowHeight = window.innerHeight / windowScaleFactor;

    //line position (with offset)
    let positionX1 = positions[index1][0] * windowWidth;
    let positionY1 = positions[index1][1] * windowHeight;
    let positionX2 = positions[index2][0] * windowWidth;
    let positionY2 = positions[index2][1] * windowHeight;

    //responsive offset
    const offsetX = window.innerWidth * 0.37;
    const offsetY = window.innerHeight * 0.29;

    positionX1 += offsetX;
    positionY1 += offsetY;
    positionX2 += offsetX;
    positionY2 += offsetY;

    //distance
    let length = Math.sqrt((positionX2 - positionX1) ** 2 + (positionY2 - positionY1) ** 2);
    if(Math.abs(positionX2 - positionX1) < Math.abs(positionY2 - positionY1))
    {
        //vertical
        length = Math.sqrt((positionX2 - positionX1) ** 2 + (positionY2 - positionY1) ** 2);
    }

    //center point of line
    const centerX = ((positionX1 + positionX2) / 2);
    const centerY = (positionY1 + positionY2) / 2;

    //angle of line
    const lineAngle = Math.atan2(positionY2 - positionY1, positionX2 - positionX1);
    
    //change line based on z position (front lines in front, back lines in back)
    let zindex = 2;
    if(positions[index1][2] > 0 || positions[index2][2] > 0)
    {
        //go behind
        zindex = 0;
    }

    /*[36.16987298107836,44.8301270189225], [48.83974596215565,53.83974596215608]; Angle - 30.000000000002878*/
    //console.log(`[${positionX1}, ${positionX2}], [${positionY1}, ${positionY2}]; Angle - ${toDegrees(lineAngle)}`);
    
    return {
        width: `${length}px`, // Match coordinate scaling
        top: `${centerY}px`,
        left: `${centerX - length/2 + .5}px`,
        transform: `rotate(${toDegrees(lineAngle)}deg)`,
        transformOrigin: "center center",
        position: "absolute",
        backgroundColor: "white",
        height: "2px",
        zIndex: `${zindex}`,
    };
}

function multiplyMatrix(matA, matB)
{
    if (!Array.isArray(matB[0])) {
        matB = matB.map(value => [value]); // Convert 1D array to 2D column matrix
    }
    const colsA = matA[0].length;
    const rowsA = matA.length;
    const colsB = matB[0].length;
    const rowsB = matB.length;

    if(colsA !== rowsB)
    {
        console.log("Rows must match");
        return null;
    }
    let result = makeArray(rowsA, colsB);

    for(let i = 0; i < rowsA; i++)
    {
        for(let j = 0; j < colsB; j++)
        {
            let sum = 0;
            for(let k = 0; k < colsA; k++)
            {
                sum += matA[i][k] * matB[k][j];
            }
            result[i][j] = sum;
        }
    }

    return result;

}
function logMatrix(mat)
{
    if (Array.isArray(mat[0])) {
        // It's a 2D array
        const rows = mat.length;
        const cols = mat[0].length;
        for (let i = 0; i < rows; i++) {
            let rowStr = mat[i].map((val) => val.toFixed(2)).join(", ");
            console.log(`[ ${rowStr} ]`);
        }
    } else {
        // It's a 1D array
        let rowStr = mat.map((val) => val.toFixed(2)).join(", ");
        console.log(`[ ${rowStr} ]`);
    }
}
function makeArray(d1, d2) {
    var arr = [];
    for (let i = 0; i < d1; i++) {  // d1 should represent rows
        arr.push(new Array(d2).fill(0));  // d2 represents columns, and fill(0) initializes the array elements to 0
    }
    return arr;
}
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}
function toDegrees(radians) {
    return radians * (180 / Math.PI);
}



export default ThreeDimShape;