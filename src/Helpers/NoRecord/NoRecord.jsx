import React from "react";


const NoRecord = () => {
    return (
        <>
            <div className="empty-state">
                <div className="empty-state__content">
                    <div className="empty-state__icon">
                        <img
                            src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?t=st=1688710340~exp=1688710940~hmac=2cc8632e2b4b000169351f7bd3b74e3307aa59e0081e4c3c9a22b7f0fce46cde"
                            alt=""
                        />
                    </div>
                    <div className="empty-state__message purpleText mt-4">No records has been added yet.</div>
                    <div className="empty-state__help mt-3 text-black">
                        Add a new record by simply clicking the button on top right side.
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoRecord;