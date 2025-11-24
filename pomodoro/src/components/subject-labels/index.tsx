import './subject-labels.style.css';

export function SubjectLabels() {
    return(
        <div>
            <label htmlFor="subject" className="subject-label"> Subject: 
                <input className="subject-input" type="text" id="subject" placeholder="Subject of study"/>
            </label>

            <label htmlFor="webhook" className="subject-label"> Webhook: 
                <input className="subject-input" type="text" id="webhook" placeholder="Webhook (Discord)"/>
            </label>
        </div>
    );
}