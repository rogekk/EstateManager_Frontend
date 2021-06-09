import {InputAdornment, TextField, Typography} from "@material-ui/core";
import {FilterList} from "@material-ui/icons";
import {OwnerSearch} from "./community/ManagerCommunity";

export const ListHeader = (
    {
        name,
        column,
        setSearch
    }: {
        name: string,
        column: keyof OwnerSearch,
        setSearch: (key: keyof OwnerSearch, value: string) => void
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