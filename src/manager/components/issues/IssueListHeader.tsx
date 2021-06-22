import { InputAdornment, TextField, Typography } from "@material-ui/core"
import { FilterList } from "@material-ui/icons"
import { IssueSearch } from "../communities/ManagerCommunity"

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
    return <div className={'column air'}>
        <Typography>
            {name}
        </Typography>
        <TextField
            InputProps={{startAdornment: (<InputAdornment position={"start"}> <FilterList/> </InputAdornment>)}}
            onChange={(e) => setSearch(column, e.target.value)}
        />
    </div>
}