import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  ListItemIcon,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
// import React from 'react';
import CloseIcon from '@mui/icons-material/Close'; // 閉じるボタン用のアイコン
import FastfoodIcon from '@mui/icons-material/Fastfood'; //食事アイコン
import AlarmIcon from '@mui/icons-material/Alarm';
import AddHomeIcon from '@mui/icons-material/AddHome';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SystemSecurityUpdateGoodIcon from '@mui/icons-material/SystemSecurityUpdateGood';
import AssuredWorkloadOutlinedIcon from '@mui/icons-material/AssuredWorkloadOutlined';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import WorkIcon from '@mui/icons-material/Work';
import PaidIcon from '@mui/icons-material/Paid';
import SavingsIcon from '@mui/icons-material/Savings';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { ExpenseCategory, IncomeCategory, Transaction } from '../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Schema, transactionSchema } from '../validations/schema';

interface TransactionFormProps {
  onCloseForm: () => void;
  isEntryDrawerOpen: boolean;
  currentDay: string;
  onSaveTransaction: (transaction: Schema) => Promise<void>;
  selectedTransaction: Transaction | null;
  setSelectedTransaction: React.Dispatch<
    React.SetStateAction<Transaction | null>
  >;
  onDeleteTransaction: (transactionId: string) => Promise<void>;
  onUpdateTransaction: (
    transaction: Schema,
    transactionId: string
  ) => Promise<void>;
}

type IncomeExpense = 'income' | 'expense';

interface CategoryItem {
  label: IncomeCategory | ExpenseCategory;
  icon: JSX.Element;
}

const TransactionForm = ({
  onCloseForm,
  isEntryDrawerOpen,
  currentDay,
  onSaveTransaction,
  selectedTransaction,
  setSelectedTransaction,
  onDeleteTransaction,
  onUpdateTransaction,
}: TransactionFormProps) => {
  const formWidth = 320;

  const expenseCategories: CategoryItem[] = [
    { label: '食費', icon: <FastfoodIcon fontSize="small" /> },
    { label: '日用品', icon: <AlarmIcon fontSize="small" /> },
    { label: '住宅費', icon: <AddHomeIcon fontSize="small" /> },
    { label: '交際費', icon: <VolunteerActivismIcon fontSize="small" /> },
    { label: '娯楽', icon: <SportsEsportsIcon fontSize="small" /> },
    {
      label: '電子決済',
      icon: <SystemSecurityUpdateGoodIcon fontSize="small" />,
    },
    { label: 'ポイント使用', icon: <CurrencyRubleIcon fontSize="small" /> },
    {
      label: '銀行送金',
      icon: <AssuredWorkloadOutlinedIcon fontSize="small" />,
    },
  ];

  const incomeCategories: CategoryItem[] = [
    { label: '給与', icon: <WorkIcon fontSize="small" /> },
    { label: '副収入', icon: <PaidIcon fontSize="small" /> },
    { label: 'お小遣い', icon: <SavingsIcon fontSize="small" /> },
  ];

  const [categories, setCategories] = useState(expenseCategories);

  // react-hock-form関連
  const {
    control,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      type: 'expense',
      date: currentDay,
      amount: 0,
      category: '',
      content: '',
    },
    resolver: zodResolver(transactionSchema),
  });
  // console.log(errors);

  useEffect(() => {
    setValue('date', currentDay);
  }, [currentDay]);

  // 収支タイプを切り替える
  const incomeExpenseToggle = (type: IncomeExpense) => {
    setValue('type', type);
    setValue('category', '');
  };

  // 収支タイプを監視
  const currentType = watch('type');

  // カレンダー上の選択した日付を取得してセット
  useEffect(() => {
    const newCategories =
      currentType === 'expense' ? expenseCategories : incomeCategories;
    setCategories(newCategories);
  }, [currentType]);

  // 送信処理
  const onSubmit: SubmitHandler<Schema> = (data) => {
    // console.log(data);
    if (selectedTransaction) {
      onUpdateTransaction(data, selectedTransaction?.id)
        .then(() => {
          // console.log('更新しました');
          setSelectedTransaction(null);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      onSaveTransaction(data)
        .then(() => {
          console.log('保存しました');
        })
        .catch((error) => {
          console.error(error);
        });
    }

    reset({
      type: 'expense',
      date: currentDay,
      amount: 0,
      category: '',
      content: '',
    });
  };

  useEffect(() => {
    //選択肢が更新されたか確認
    if (selectedTransaction) {
      const categoryExists = categories.some(
        (category) => category.label === selectedTransaction.category
      );
      setValue('category', categoryExists ? selectedTransaction.category : '');
    }
  }, [selectedTransaction, categories]);

  // フォーム内容を更新
  useEffect(() => {
    if (selectedTransaction) {
      setValue('type', selectedTransaction.type);
      setValue('date', selectedTransaction.date);
      setValue('amount', selectedTransaction.amount);
      setValue('content', selectedTransaction.content);
    } else {
      reset({
        type: 'expense',
        date: currentDay,
        amount: 0,
        category: '',
        content: '',
      });
    }
  }, [selectedTransaction]);

  // フォーム内容を削除
  const handleDelete = () => {
    if (selectedTransaction) {
      onDeleteTransaction(selectedTransaction?.id);
      setSelectedTransaction(null);
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 64,
        right: isEntryDrawerOpen ? formWidth : '-2%', // フォームの位置を調整
        width: formWidth,
        height: '100%',
        bgcolor: 'background.paper',
        zIndex: (theme) => theme.zIndex.drawer - 1,
        transition: (theme) =>
          theme.transitions.create('right', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        p: 2, // 内部の余白
        boxSizing: 'border-box', // ボーダーとパディングをwidthに含める
        boxShadow: '0px 0px 15px -5px #777777',
      }}
    >
      {/* 入力エリアヘッダー */}
      <Box display={'flex'} justifyContent={'space-between'} mb={2}>
        <Typography variant="h6">入力</Typography>
        {/* 閉じるボタン */}
        <IconButton
          onClick={onCloseForm}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* フォーム要素 */}
      <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          {/* 収支切り替えボタン */}
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <ButtonGroup fullWidth>
                <Button
                  variant={field.value === 'expense' ? 'contained' : 'outlined'}
                  color="error"
                  onClick={() => incomeExpenseToggle('expense')}
                >
                  支出
                </Button>
                <Button
                  variant={field.value === 'income' ? 'contained' : 'outlined'}
                  onClick={() => incomeExpenseToggle('income')}
                >
                  収入
                </Button>
              </ButtonGroup>
            )}
          />

          {/* 日付 */}
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.date}
                helperText={errors.date?.message}
              />
            )}
          />

          {/* カテゴリ */}
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.category}
                helperText={errors.category?.message}
                {...field}
                id="カテゴリ"
                label="カテゴリ"
                select
              >
                {categories.map((category) => (
                  <MenuItem value={category.label} key={category.label}>
                    <ListItemIcon>{category.icon}</ListItemIcon>
                    {category.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          {/* 金額 */}
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.amount}
                helperText={errors.amount?.message}
                {...field}
                value={field.value === 0 ? '' : field.value}
                onChange={(e) => {
                  const newValue = parseInt(e.target.value, 10) || 0;
                  field.onChange(newValue);
                }}
                label="金額"
                type="number"
              />
            )}
          />

          {/* 内容 */}
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.content}
                helperText={errors.content?.message}
                {...field}
                label="内容"
                type="text"
              />
            )}
          />

          {/* 保存・更新ボタン */}
          <Button
            type="submit"
            variant="contained"
            color={currentType === 'income' ? 'primary' : 'error'}
            fullWidth
          >
            {selectedTransaction ? '更新' : '保存'}
          </Button>

          {/* 削除ボタン */}
          {selectedTransaction && (
            <Button
              onClick={handleDelete}
              variant="outlined"
              color={'secondary'}
              fullWidth
            >
              削除
            </Button>
          )}
        </Stack>
      </Box>
    </Box>
  );
};
export default TransactionForm;
