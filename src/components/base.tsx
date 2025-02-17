import { styled } from '@mui/system';
export const Header = styled('div')({
    display: 'flex',
    height: '100px',
    backgroundColor: '#e5f8ff',
    justifyContent: 'center',
    '& > h1': {
        color: '#525252',
    }
})

export const Page = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
})


export const Body = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1024px',
    alignSelf: 'center',
    padding: '20px',
})
