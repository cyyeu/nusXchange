import React from 'react'
import { Grid } from '@material-ui/core'
import { Typography,LinearProgress } from '@material-ui/core'

import { AdvancedImage} from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/base";
import { fill } from "@cloudinary/base/actions/resize";
import { max } from "@cloudinary/base/actions/roundCorners";
import { defaultImage } from "@cloudinary/base/actions/delivery";

//cloudinary instance and code
const cld = new Cloudinary({
  cloud: {
    cloudName: "nusxchange",
  },
});

const profile_img = cld.image("default");
profile_img.delivery(defaultImage("default"));
profile_img.resize(fill().width(150).height(150)).roundCorners(max());

const Sidebar = () => {
  return (
    <Grid
      item
      container
      alignItems='flex-start'
      xs={2}
      direction='column'
      spacing={2}
    >
      <Grid item>
        <Typography variant='h4' color='secondary'>
          Hello Jethro.
        </Typography>
      </Grid>
      <Grid item>
        <AdvancedImage cldImg = {profile_img} />
      </Grid>
      <Grid item>
        <Typography variant='body2'>Level 5</Typography>
        <LinearProgress
          style={{ width: '200px' }}
          variant='determinate'
          value={40}
          color='secondary'
        />
        <Typography variant='body2'>
          100 experience points to next level
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography variant='body2' align='left'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae
          vulputate tortor. Nam nec justo in neque blandit hendrerit sit amet ut
          ante. Duis elit mauris, elementum sed lacus nec.
        </Typography>
      </Grid>
    </Grid>
  )
}

 
export default Sidebar
