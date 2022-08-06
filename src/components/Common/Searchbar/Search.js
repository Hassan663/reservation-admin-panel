import { Input, Space } from 'antd';

const Search = () => {
    const { Search } = Input;
    return (
        <div className='search'>
            <Search placeholder="Search..."  style={{ width: 150, color: "black"}} />
        </div>
    )
}
export default Search