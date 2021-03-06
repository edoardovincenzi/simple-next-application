import React from 'react';
import { IStatistics } from '../../model';
import { getSplitString } from '../../utility';
import { useStore } from '../../utility/initialValue';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './ResultData.module.css';
import { Box, Paper } from '@mui/material';
import Divider from '@mui/material/Divider';

const ResultData = ({ data }: { data: IStatistics[] }) => {
  return (
    <>
      {data.length > 0 ? (
        data.map((item: IStatistics, index: number) => (
          <Accordion key={index} className={styles.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel-content"
              id="panel-content"
              sx={{
                '& .MuiAccordionSummary-content': { justifyContent: 'center' },
              }}
            >
              <Typography>
                Dato che va dal{' '}
                <strong className={styles.strong}>
                  {getSplitString(item.time.min.toString(), 'T')}
                </strong>
                al{' '}
                <strong className={styles.strong}>
                  {getSplitString(item.time.max.toString(), 'T')}
                </strong>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Divider sx={{ mb: 1 }} />
              <Box className="flex_column_center">
                <Typography>
                  Media emissioni CO2:{' '}
                  <strong className={styles.strong}>
                    {item.value.average}
                  </strong>
                </Typography>
                <Typography>
                  Massime emissioni CO2:{' '}
                  <strong style={{}}>{item.value.max}</strong>
                </Typography>
                <Typography>
                  Minime emissioni CO2:{' '}
                  <strong className={styles.strong}>{item.value.min}</strong>
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Paper
          elevation={3}
          className={`${styles.paperBasic} flex_column_center_w100`}
          sx={{ mt: 2, mb: 3, p: 3 }}
        >
          <Typography>Non ci sono risultati</Typography>
        </Paper>
      )}
    </>
  );
};

export default ResultData;
