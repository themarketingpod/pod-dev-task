export default function DesignSystem() {
    return (
        <>
        <div className="px-20 py-10">
            <div>
                <h1>This is a title</h1>
                <h2>This is a subtitle</h2>
                <p>This is a paragraph</p>
                <a href="#">This is an anchor</a>
            </div>
            <div>
                <input type="text" />
            </div>
            <div>
                <input type="checkbox" />
                <label htmlFor="checkbox">Checkbox</label>
            </div>
            <div className="my-4 flex flex-col w-[200px]">
                <button className="btn">This is a button</button>
                <button className="btn btn-accept">Primary button</button>
                <button className="btn btn-reject">Primary button</button>
            </div>
            <div>
                <select>
                    <option>Option 1</option>
                    <option>Option 2</option>
                </select>
            </div>
        </div>
        </>
    )
}