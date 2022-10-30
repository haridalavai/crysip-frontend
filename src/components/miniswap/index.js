import { IconButton, Grid, Box, Divider, Typography, Stack, MenuItem, Menu } from '@mui/material';
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import exchangeThree from '@iconify/icons-icon-park-outline/exchange-three';
import { alpha, styled } from '@mui/material/styles';
import cssStyles from '../../utils/cssStyles';
import { IconButtonAnimate } from '../animate';
import MenuPopover from '../MenuPopover';
import TransferForm from './TransferForm';

const RootStyle = styled('span')(({ theme }) => ({
  ...cssStyles(theme).bgBlur({ opacity: 0.64 }),
  right: 20,
  top: '95%',
  position: 'fixed',
  marginTop: theme.spacing(-3),
  padding: theme.spacing(0.5),
  zIndex: theme.zIndex.drawer + 2,
  borderRadius: '100%',
}));
const Miniswap = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <RootStyle sx={{ boxShadow: `${open ? 'none' : '0px 0px 36px 5px rgb(28 202 255)'}` }}>
      <IconButtonAnimate
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Icon icon={exchangeThree} />
      </IconButtonAnimate>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Box sx={{ width: '300px' }}>
          <TransferForm />
        </Box>
      </Menu>
    </RootStyle>
  );
};

export default Miniswap;
