const initStyle = {
    slideWrapper: {
        position: 'relative',
        overflow: 'hidden',
    },
    imgsWrapper: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%'
    },
    arrow: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroudColor: 'rgba(255,255,255,.5)',
        color: '#fff',
        textAlign: 'center',
        lineHeight: '50px',
        fontSize: '50px',
        fontWeight: 'bold',
        padding: '20px',
        cursor: 'pointer',
        userSelect: 'none',
        boxShadow: '0px 0px 20px 0px #fff',
        position: 'absolute'
    },
    dotsWrapper: {
        column: {
            padding: "2px 3px",
            position: "absolute",
            right: " 20px",
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0,0,0,.2)",
            borderRadius: "20px"
        },
        row: {
            padding: '2px 4px',
            position: 'absolute',
            left: '50%',
            bottom: '10px',
            transform: 'translateX(-50%)',
            backgroundColor: "rgba(0,0,0,.2)",
            borderRadius: "20px"
        }
    },
    dot: {
        common: {
            width: '20px',
            height: '20px',
            backgroundColor: '#fff',
            borderRadius: '50%',
            cursor: 'pointer',
            boxShadow: '0px 0px 20px 0px #fff',
        },
        column: function () {
            return {
                ...this.common,
                margin: '20px 0'
            }
        },
        row: function () {
            return {
                ...this.common,
                display: 'inline-block',
                margin: '0 10px'
            }
        }
    }
}
export default initStyle;