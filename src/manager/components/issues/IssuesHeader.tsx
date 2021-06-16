import React from 'react'

export default function IssuesHeader({issues}) {
    const columns = issues[0] && Object.keys(issues)

    return (
        <table cellPadding={0} cellSpacing={0}>
            <thead>
                <tr>{issues[0] && columns.map((heading) => <th>{heading}</th>)}</tr>
            </thead>
            <tbody>
                {issues.map((row) => <tr>
                   {
                    columns.map((column) => <td>{row[column]}</td>)        
                   }
                </tr>)}
            </tbody>
        </table>
    )
}



