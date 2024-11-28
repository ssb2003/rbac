import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  MarkdownField,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { BaseRecord, useMany } from "@refinedev/core";
import { Space, Table, Input, Select, Form } from "antd";
import { useState } from "react";

export const BlogPostList = () => {
  const { tableProps, searchFormProps } = useTable({
    syncWithLocation: true,
  });

  const { data: categoryData, isLoading: categoryIsLoading } = useMany({
    resource: "categories",
    ids:
      tableProps?.dataSource
        ?.map((item) => item?.category?.id)
        .filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

  // Dynamic filtering for the table
  const filteredData = tableProps?.dataSource?.filter((row) => {
    if (searchText) {
      const keyword = searchText.toLowerCase();
      return (
        row.title?.toString().toLowerCase().includes(keyword) ||
        row.content?.toString().toLowerCase().includes(keyword)
      );
    }
    return true;
  }).filter((row) => {
    if (selectedCategory) {
      return row.category?.id === selectedCategory;
    }
    return true;
  });

  return (
    <List>
      {/* Search and Filter Section */}
      <Form {...searchFormProps} layout="inline" style={{ marginBottom: 16 }}>
        <Form.Item name="title" label="Search" style={{ marginRight: 16 }}>
          <Input
            placeholder="Search by title or content"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: 16, width: "300px" }}
          />
        </Form.Item>

        <Form.Item name="category" label="Category" style={{ marginRight: 16 }}>
          <Select
            placeholder="Filter by category"
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={
              categoryData?.data?.map((category) => ({
                label: category.title,
                value: category.id,
              })) ?? []
            }
            style={{ width: 200 }}
            loading={categoryIsLoading}
          />
        </Form.Item>
      </Form>

      {/* Table for displaying blog posts */}
      <Table
        {...tableProps}
        dataSource={filteredData} // Use filtered data for rendering
        rowKey="id"
      >
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column dataIndex="title" title={"Name"} />
        <Table.Column
          dataIndex="content"
          title={"Permissions"}
          render={(value: any) => {
            if (!value) return "-";
            return <MarkdownField value={value.slice(0, 80) + "..."} />;
          }}
        />
        <Table.Column
          dataIndex={"category"}
          title={"Role"}
          render={(value) =>
            categoryIsLoading ? (
              <>Loading...</>
            ) : (
              categoryData?.data?.find((item) => item.id === value?.id)?.title
            )
          }
        />
        <Table.Column dataIndex="status" title={"Status"} />
        <Table.Column
          dataIndex={["createdAt"]}
          title={"Created at"}
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
