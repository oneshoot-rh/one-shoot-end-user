import {  Card, CardContent, Typography, Button, Theme, List, ListItem, ListItemText } from '@mui/material';
import Grid from '@mui/material/Grid/Grid';
import React, { useState } from 'react';
import { makeStyles, createStyles } from '@mui/styles';

const useStyles = makeStyles((theme:Theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  card: {
    minWidth: 200,
    textAlign: 'center',
  },
  selectedCard: {
      border: `2px solid ${theme.palette.primary.main}`,
      backgroundColor: "#f5f5f5",
  },
}));

const SubscriptionPlanPicker = () => {
  const classes = useStyles();

  const subscriptionPlans : SubscriptionPlan[] = [
      {
          id: 1, name: 'Basic Plan', description: 'Access to basic features', price: '$10/month',
          features: [
                'Feature 1',
                'Feature 2',
                'Feature 3'
          ]
      },
        {
            id: 2, name: 'Pro Plan', description: 'Access to pro features', price: '$20/month',
            features: [
                    'Feature 1',
                    'Feature 2',
                    'Feature 3',
                    'Feature 4',
                    'Feature 5'
            ]
        },
        {
            id: 3, name: 'Enterprise Plan', description: 'Access to enterprise features', price: '$50/month',
            features: [
                    'Feature 1',
                    'Feature 2',
                    'Feature 3',
                    'Feature 4',
                    'Feature 5',
                    'Feature 6',
                    'Feature 7'
            ]
        }
    ];
const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>(subscriptionPlans[0]);


  const handlePlanSelect = (plan: SubscriptionPlan) => {
      setSelectedPlan(plan);
      console.log('Selected Plan:', plan);
      
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3} p="3rem">
        {subscriptionPlans.map((plan) => (
          <Grid item key={plan.id} xs={12} sm={6} md={4} lg={4}>
            <Card
              className={`${classes.card} ${selectedPlan.id === plan.id ? classes.selectedCard : ''}`}
              variant="outlined"
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {plan.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {plan.description}
                </Typography>
                <Typography variant="h5" color="primary">
                  {plan.price}
                        </Typography>
                        <List dense>
                            {plan.features.map((feature) => (
                                <ListItem key={feature}>
                                    <ListItemText primary={feature} />
                                </ListItem>
                            ))}
                        </List>
                <Button
                  variant="contained"
                  color="primary"
                            onClick={() => handlePlanSelect(plan)}
                            sx={{mt:"2rem"}}
                >
                  Select Plan
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SubscriptionPlanPicker;
