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
    return <div className="list__searchbox">
        <Typography className= "list__name">
            {name}
        </Typography>
        <TextField
            InputProps={{startAdornment: (<InputAdornment position={"start"}> <FilterList/> </InputAdornment>)}}
            onChange={(e) => setSearch(column, e.target.value)}
        />
    </div>
}