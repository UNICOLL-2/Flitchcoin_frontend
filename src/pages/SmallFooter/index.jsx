import pattern from "./pattern.svg"
const SmallFooter = () => {
    return (
        <div style={{ background: "#000" }}>
            <div className="row ">
                <div className="col-6 pt-3">
                    <p className="text-white ps-5" style={{fontSize: "16px"}}>© 2023 Flitchcoin. All rights reserved.</p>
                </div>
            <div className="col-6 pattern">
            <img src={pattern} alt="" />
            </div>
        </div>
    </div >
  )
}

export default SmallFooter