import React, { useState } from 'react';
import { InputSwitch } from 'primereact/inputswitch';
import MasterView from './MasterView';
import AllTestView from './AllTestView';

const Tracker = () => {
    const [showMasterComponent, setShowMasterComponent] = useState(false);

    const handleToggleChange = (e) => {
        setShowMasterComponent(e.value);
    };

    return (
        <div>
            <div className="p-field">
                {/* <label htmlFor="toggle">ENABLE MIS VIEW</label> */}
                <InputSwitch id="toggle" checked={showMasterComponent} onChange={handleToggleChange} />
            </div>

            {showMasterComponent ? <MasterView /> : <AllTestView />}
        </div>
    );
};

export default Tracker;
