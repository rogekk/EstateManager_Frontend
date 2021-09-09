import { InputAdornment, TextField, Typography } from "@material-ui/core"
import { FilterList } from "@material-ui/icons"
import { IssueSearch } from "../communities/ManagerCommunity"
import "./IssuesList.css"

export const IssueListHeader = (
    {
        name,
        column,
        setSearch,
    }: {
        name: string,
        column: keyof IssueSearch,
        setSearch: (key: keyof IssueSearch, value: string) => void
    }
) => {
    return <div >
        <TextField className="list__searchbox"
            color="primary"

            InputProps={{startAdornment: (<InputAdornment position={"start"}> <FilterList/> </InputAdornment>)}}
            placeholder={`Search ${name}`}
            onChange={(e) => setSearch(column, e.target.value)}
        />
    </div>
}