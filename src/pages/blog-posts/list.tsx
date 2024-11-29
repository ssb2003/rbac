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
import { Space, Table, Input, Select, Form, Button, Dropdown, Menu } from "antd";
import { useState } from "react";
import { DownOutlined } from "@ant-design/icons";

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
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();

  // Dynamic filtering for the table
  const filteredData = tableProps?.dataSource
    ?.filter((row) => {
      if (searchText) {
        const keyword = searchText.toLowerCase();
        return (
          row.title?.toString().toLowerCase().includes(keyword) ||
          row.content?.toString().toLowerCase().includes(keyword)
        );
      }
      return true;
    })
    .filter((row) => {
      if (selectedCategory) {
        return row.category?.id === selectedCategory;
      }
      return true;
    })
    .filter((row) => {
      if (selectedStatus) {
        return row.status === selectedStatus;
      }
      return true;
    })
    // Sort by createdAt in descending order manually
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Dropdown menu for status filter
  const statusMenu = (
    <Menu
      onClick={({ key }) => setSelectedStatus(key === "all" ? undefined : key)}
    >
      <Menu.Item key="all">All Statuses</Menu.Item>
      <Menu.Item key="accepted">Accepted</Menu.Item>
      <Menu.Item key="onProcess">onProcess</Menu.Item>
      <Menu.Item key="rejectedd">Rejected</Menu.Item>
    </Menu>
  );

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

        <Form.Item name="status" label="Status" style={{ marginRight: 16 }}>
          <Dropdown overlay={statusMenu} trigger={["click"]}>
            <Button>
              {selectedStatus ? selectedStatus : "Filter by Status"}{" "}
              <DownOutlined />
            </Button>
          </Dropdown>
        </Form.Item>
      </Form>

      {/* Table for displaying blog posts */}
      <Table
        {...tableProps}
        dataSource={filteredData} // Use filtered and manually sorted data
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


