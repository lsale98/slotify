import ActivateForm from '@/features/auth/components/ActivateForm';

type SearchParams = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

const Activate = ({ searchParams }: SearchParams) => {
  return <ActivateForm searchParams={searchParams} />;
};

export default Activate;
